import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox/checkbox';

import { EditorConfig } from 'src/app/common/editor-config';

@Component({
  selector: 'app-main-frame',
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.scss']
})
export class MainFrameComponent implements OnInit {

  private INTERNALS = 0;
  private CUSTOMERS = 1;
  private VISITORS = 2;

  enabled = false;

  configs: EditorConfig[];
  constructor() { }

  ngOnInit(): void {
    // call server later
    this.configs = [];
    for(let i = 0; i < 3; i++) {
      this.configs.push(new EditorConfig());
    }

    this.configs[this.INTERNALS].title = "Internals";
    this.configs[this.CUSTOMERS].title = "Customers";
    this.configs[this.VISITORS].title = "Visitors";
  }

  // event handlers

  public toggleMOTD(event: MatCheckboxChange): void {
    this.enabled = event.checked;
  }

  // helpers functions

  public getTabTitle(no: number): string {
    let t = this.configs[no].title;
    if (this.configs[no].isDirty) {
      t += '*';
    }

    return t;
  }
}
