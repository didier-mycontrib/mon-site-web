import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QcmComponent } from './qcm/qcm.component';
import { AdminQcmComponent } from './admin-qcm/admin-qcm.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsUtilModule } from 'src/bs-util/bs-util.module';
import { GenericModule } from 'src/generic/generic.module';
import { HttpClientModule } from '@angular/common/http';
import { PerformQcmComponent } from './qcm/perform-qcm/perform-qcm.component';
import { OptionQcmComponent } from './qcm/option-qcm/option-qcm.component';
import { ResultQcmComponent } from './qcm/result-qcm/result-qcm.component';
import { QcmEditorComponent } from './admin-qcm/qcm-editor/qcm-editor.component';
import { AdminQcmResultsComponent } from './admin-qcm-results/admin-qcm-results.component';


@NgModule({
  imports: [
    CommonModule , FormsModule , RouterModule , BrowserAnimationsModule, HttpClientModule,
    TabsModule.forRoot(),
    BsUtilModule,
    GenericModule 
    ],
  exports: [
    QcmComponent 
  ],
  declarations: [ QcmComponent, AdminQcmComponent, PerformQcmComponent, OptionQcmComponent, ResultQcmComponent, QcmEditorComponent, AdminQcmResultsComponent 
  ]
})
export class QcmModule { }
