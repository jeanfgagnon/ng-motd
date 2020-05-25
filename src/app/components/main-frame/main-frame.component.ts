import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox/checkbox';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { EditorConfig } from 'src/app/common/editor-config';
import { environment } from 'src/environments/environment';

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

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // call server later
    this.configs = [];
    this.loadData().subscribe((result) => {
      this.configs = result;
    },
      (err) => {
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
      });

  }

  // event handlers

  public toggleMOTD(event: MatCheckboxChange): void {
    this.enabled = event.checked;
    this.changed = true;
  }

  public configChanged(no: number): void {
    this.changed = true;
  }

  public saveClicked(e: Event): void {
    this.saveData().subscribe(
      (result) => {
        if (result === 'ok') {
          this.showSnackBar('Save successfully');
        }
        else {
          this.showSnackBar(`Error occured: ${result}`);
        }
      },
      (err) => {
        this.showSnackBar(`Request failed ${err.status}`);
      });
  }

  // helpers functions

  public getTabTitle(no: number): string {
    let t = '';
    if (this.configs.length > 0) {
      t = this.configs[no].title;
      if (this.configs[no].isDirty) {
        t += '*';
      }
    }

    return t;
  }

  // private code

  private saveData(): Observable<string> {
    let myHeaders: HttpHeaders = new HttpHeaders();
    myHeaders.set('Content-Type', 'application/json');

    const myBody: any = {
      configs: this.configs
    };

    return this.http
      .post<string>(`${environment.apiUrl}savemotd`, myBody, { headers: myHeaders })
      .pipe(map((result: string) => result));
  }

  private loadData(): Observable<EditorConfig[]> {
    let myHeaders: HttpHeaders = new HttpHeaders();
    myHeaders.set('Content-Type', 'application/json');

    return this.http.get<EditorConfig[]>(`${environment.apiUrl}loadmotd`, { headers: myHeaders })
      .pipe(map((data: EditorConfig[]) => data));
  }

  private showSnackBar(message: string, action?: string) {
    let config = new MatSnackBarConfig();
    config.duration = 4000;
    this.snackBar.open(message, action, config);
  }

}
