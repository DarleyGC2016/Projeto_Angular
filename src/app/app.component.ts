import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { AppService } from "./app.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public result: any;
  public form: FormGroup;
  public mode = "add";
  constructor(private service: AppService, private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ["", Validators.compose([Validators.required])],
      lastName: ["", Validators.compose([Validators.required])],
      vehiclePlate: [
        "",
        Validators.compose([
          Validators.minLength(7),
          Validators.minLength(7),
          Validators.required
        ])
      ],
      dailyUsage: [
        "",
        Validators.compose([Validators.min(1), Validators.required])
      ],
      qtd: ["", Validators.compose([Validators.min(1), Validators.required])],
      hora: [
        "",
        Validators.compose([
          Validators.min(1),
          Validators.max(24),
          Validators.required
        ])
      ],
      phone: [
        "",
        Validators.compose([
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.required
        ])
      ],
      userEmail: [
        "",
        Validators.compose([Validators.email, Validators.required])
      ],
      vehicleType: ["", Validators.compose([Validators.required])],
      totalValue: [
        "",
        Validators.compose([Validators.min(100), Validators.required])
      ]
    });
  }
  ngOnInit() {
    this.result = {};
    this.add();
    this.clear();
  }
  add() {
    this.service
      .add(this.form.value)
      .subscribe(formulario => (this.result = formulario));
  }

  clear() {
    this.form.reset();
  }
  mudaMode(mode: string) {
    this.mode = mode;
  }
}
