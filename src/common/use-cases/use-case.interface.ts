import { Observable } from 'rxjs';

export interface IUseCase<T, F> {
  execute(objectInput: T, ...options: any): Observable<F>;
}
