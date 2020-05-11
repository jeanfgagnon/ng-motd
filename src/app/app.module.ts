import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MyMaterialModule } from './my-material/my-material.module';
import { MainFrameComponent } from './components/main-frame/main-frame.component';
import { EditorGutsComponent } from './components/editor-guts/editor-guts.component';

@NgModule({
  declarations: [
    AppComponent,
    MainFrameComponent,
    EditorGutsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MyMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
