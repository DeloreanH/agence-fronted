import {Observable, throwError} from 'rxjs';
import { retry, timeout, delay, catchError } from 'rxjs/operators';
import { RequestSettings} from '../../common/interfaces/server.interface';
import {environment} from '../../../environments/environment';

export class HttpService {
  protected apiUrl: string = environment.api.url;
  protected requestRetry: number = environment.requestRetry;
  protected requestTimeout: number = environment.requestTime;
  protected delayRequest: number = environment.delayRequest;
  protected requestSettings: RequestSettings = {
    delay: this.delayRequest,
    timeOut: this.requestTimeout,
    retry: this.requestRetry
  };

  constructor() {}

  public fetch(observable: Observable<any>, config: RequestSettings = this.requestSettings): Observable<any> {
    const settings = this.attachSettings(config);
    return observable.pipe(
      delay(settings.delay),
      retry(settings.retry),
      timeout(settings.timeOut),
      catchError(this.handleError)
    );
  }

  private attachSettings(config: RequestSettings): RequestSettings {
    const initialConfig = this.requestSettings;
    Object.assign(initialConfig, config);
    return initialConfig;
  }

  private handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
