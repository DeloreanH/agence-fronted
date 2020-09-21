import {HttpErrorResponse} from '@angular/common/http';

export interface IServerErrorResponse extends HttpErrorResponse {
  error: IServerError;
}

export interface RequestSettings {
  test?: boolean;
  retry?: number;
  timeOut?: number;
  delay?: number;
}

export interface IServerError {
  message: string;
  validator?: IServerStringMap;
  error?: string;
}

export interface IServerStringMap {
  [key: string]: string[];
}
