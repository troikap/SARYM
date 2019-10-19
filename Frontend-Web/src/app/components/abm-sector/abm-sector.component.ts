import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SectorService } from "../../services/sector/sector.service";


@Component({
  selector: 'app-abm-sector',
  templateUrl: './abm-sector.component.html',
  styleUrls: ['./abm-sector.component.scss']
})
export class AbmSectorComponent implements OnInit {
  
  listaSector: any;
  unidadSector: any;

  constructor(
    private sectorService: SectorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllSector();
  }

  buscarSector(termino: string) {
    console.log(termino);

    if (termino.trim() !== "") {
      this.sectorService
        .getSector(termino)
        .subscribe((data: any) => {
          // Llamo a un Observer
          console.log(data);
          if (data != null) {
            this.unidadSector = data;
            this.listaSector = [];
            this.listaSector.push(data);
          }
        });
    } else {
      this.getAllSector();
    }
  }

  getAllSector() {
    this.sectorService.getAllSector().then((res: any) => {
      this.listaSector = res.data;
    });
  }
}
