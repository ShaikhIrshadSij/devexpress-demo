import {  Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dataSource: any = {};

  constructor(httpClient: HttpClient) {
      function isNotEmpty(value: any): boolean {
          return value !== undefined && value !== null && value !== "";
      }
      this.dataSource = new CustomStore({
          key: "counter",
          load: function (loadOptions: any) {
              let params: HttpParams = new HttpParams();
              [
                  "skip",
                  "take",
                  "requireTotalCount",
                  "requireGroupCount",
                  "sort",
                  "filter",
                  "totalSummary",
                  "group",
                  "groupSummary"
              ].forEach(function(i) {
                  if (i in loadOptions && isNotEmpty(loadOptions[i]))
                      params = params.set(i, JSON.stringify(loadOptions[i]));
              });
              const apiUrl = 'https://localhost:44318/api/User/GetData';
              //const apiUrl = 'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders';
              return httpClient.get(apiUrl, { params: params })
                  .toPromise()
                  .then((data: any) => {
                      return {
                          data: data.data,
                          totalCount: data.totalCount,
                          summary: data.summary,
                          groupCount: data.groupCount
                      };
                  })
                  .catch(error => { throw 'Data Loading Error' });
          }
      });
  }
}
