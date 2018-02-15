import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockUIService } from './services/blockui/index';
import { RESTConnectorService } from './services/RestService/index';
import { RefreshWebService } from './services/RefreshWeb/index';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: []
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                BlockUIService,
                RESTConnectorService,
                RefreshWebService

            ]
        };
    }
}