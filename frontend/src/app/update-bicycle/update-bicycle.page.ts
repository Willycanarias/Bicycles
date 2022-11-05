import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { BicycleService } from './../services/bicycle.service';

@Component({
  selector: 'app-update-bicycle',
  templateUrl: './update-bicycle.page.html',
  styleUrls: ['./update-bicycle.page.scss'],
})
export class UpdateBicyclePage implements OnInit {

  updateBicycleFg: FormGroup;
  id: any;

  constructor(    private bicycleService: BicycleService,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
     }

  ngOnInit() {
    this.updateBicycleFg = this.formBuilder.group({
      brand: [''],
      model: [''],
      filename: ['']
    })
  }

  ionViewDidEnter(){
    this.fetchBicycle(this.id);
  }

  fetchBicycle(id) {
    this.bicycleService.getBicycle(id).subscribe((data) => {

      this.updateBicycleFg.setValue({
        brand: data['brand'],
        model: data['model'],
        filename: data['filename']
      });
    });  }

    onSubmit() {
      if (!this.updateBicycleFg.valid) {
        return false;
      } else {
        this.bicycleService.updateBicycle(this.id, this.updateBicycleFg.value)
          .subscribe(() => {
            this.updateBicycleFg.reset();
            this.router.navigate(['/list-bicycles']);
          })
      }
    }

}
