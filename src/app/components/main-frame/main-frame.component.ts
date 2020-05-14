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

  enabled = true;
  changed = false;

  configs: EditorConfig[];
  constructor() { }

  ngOnInit(): void {
    // call server later
    this.configs = [];
    for (let i = 0; i < 3; i++) {
      let cnf = new EditorConfig();

      cnf.text = 'Type your message here';
      cnf.background = "beige";
      cnf.enabled = false;
      cnf.color = "black";
      cnf.verticalAlign = false;
      cnf.horizontalAlign = false;
      cnf.padding = 0;
      cnf.font = 'Helvetica';
      cnf.fontSize = 12;
      cnf.bold = false;
      cnf.italic = false;
      cnf.underline = false;
      cnf.height = 50;
      cnf.borderWidth = 0;
      cnf.borderStyle = 'none';
      cnf.borderColor = '';
      cnf.rounded = false;
      cnf.shadow = false;

      this.configs.push(cnf);
    }

    this.configs[this.INTERNALS].title = "Internals";
    this.configs[this.CUSTOMERS].title = "Customers";
    this.configs[this.VISITORS].title = "Visitors";
  }

  // event handlers

  public toggleMOTD(event: MatCheckboxChange): void {
    this.enabled = event.checked;
    this.changed = true;
  }

  public configChanged(no: number): void {
    this.changed = true;
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
