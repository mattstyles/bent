type ResourceFunction<T> = (...args: any[]) => Promise<T>

enum ResourceStatus {
  none = 'Resource.none',
  pending = 'Resource.pending',
  done = 'Resource.done',
  error = 'Resource.error',
}

export class Resource<T> {
  data: T | null = null
  status = ResourceStatus.none
  error = undefined
  promise?: Promise<T>
  fn: ResourceFunction<T>

  constructor(fn: ResourceFunction<T>) {
    this.fn = fn
  }

  private async run(...args: any[]): Promise<T> {
    this.status = ResourceStatus.pending
    const promise = this.fn(...args)
    promise
      .then((data: T) => {
        this.status = ResourceStatus.done
        this.data = data
      })
      .catch((err) => {
        this.status = ResourceStatus.error
        this.error = err
      })
    return promise
  }

  read(...args: any[]) {
    switch (this.status) {
      case ResourceStatus.none:
        this.promise = this.run(...args)
        throw this.promise
      case ResourceStatus.pending:
        throw this.promise
      case ResourceStatus.error:
        throw this.error
      case ResourceStatus.done:
        return this.data
    }
  }
}
