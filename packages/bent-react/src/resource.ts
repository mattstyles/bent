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
        console.log('resource resolved')
        this.status = ResourceStatus.done
        this.data = data
      })
      .catch((err) => {
        console.log('resource errored')
        this.status = ResourceStatus.error
        this.error = err
      })
    return promise
  }

  read(...args: any[]) {
    console.log('Resource::read', this.status)
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
