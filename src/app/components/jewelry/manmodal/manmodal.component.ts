import { NgbActiveModal,NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-manmodal',
  templateUrl: './manmodal.component.html',
  styleUrls: ['./manmodal.component.css']
})
export class ManmodalComponent implements OnInit {
  @Input() header: string;
  @Input() message:string;

  private _modalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'lg',
    centered: true
  };
  constructor(public activeModal: NgbActiveModal) { }
  closeModal() {
    this.activeModal.close();
  }
  ngOnInit(): void {
  }

}
