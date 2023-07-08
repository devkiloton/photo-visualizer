import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { ErrorHandler, Injectable, Injector, inject } from "@angular/core";
import { Subject } from "rxjs";
import * as StackTrace from 'stacktrace-js';
import { ServerLogService } from "../services/server-log.service";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    injector  = inject(Injector)
    handleError(error: any): void {
        const location = this.injector.get(LocationStrategy)
        const userService = this.injector.get(UserService)
        const logService = this.injector.get(ServerLogService)
        const router = this.injector.get(Router)
        const url = location instanceof PathLocationStrategy ? location.path() : 'Location not available';
        const message = error.message ? error.message : "There's no error message. Error stringfied: " + error.toString();
        StackTrace.fromError(error).then(stackFrames => {
            const stackAsString = stackFrames.join('\n');
            console.log({url, message, stack: stackAsString, date: new Date()})
            logService.log({url, message, stack: stackAsString, userName: userService.getUserName(), timestamp: new Date()})
            if(!environment.production){
                router.navigate(['/error'])
            }
        })
    }
    getErrors() {}
}