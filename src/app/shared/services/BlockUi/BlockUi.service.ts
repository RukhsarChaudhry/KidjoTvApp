//import { Injectable, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';

/**
 * This class provides the BlockUI Service 
 */
@Injectable()
export class BlockUIService {

    //blockUIEvent: EventEmitter<any>;

    private blockUI: Boolean = false;
    blockUIEvent$ = new ReplaySubject<Boolean>(1);
    private locked = false;
    constructor() {
        this.blockUIEvent$.next(false)
    }

    /**
     * Set block ui event
     * @startBlock
     */
    public startBlock(): void {
        if (this.locked) {
            return;
        }
        this.blockUI = true;
        this.blockUIEvent$.next(true);
    }
    public startBlockHold() {
        this.locked = true;
        this.blockUI = true;
        this.blockUIEvent$.next(true);
    }
    public stopBlockHold() {
        this.locked = false;
        this.blockUI = false;
        this.blockUIEvent$.next(false);
    }
    /**
     * Reset block ui event
     * @stopBlock
     */
    public stopBlock(): void {
        if (this.locked) {
            return;
        }
        this.blockUI = false;
        this.blockUIEvent$.next(false);
    }

    public getCurrentState(): Boolean {
        return this.blockUI;
    }
}