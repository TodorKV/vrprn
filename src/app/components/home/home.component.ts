import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  solved = false;
  K = undefined;
  multi: number[][] = [
    [4, 0, 0],
    [1, 9, 0],
    [0, 6, 0],
    [0, 0, 5],
  ];
  //p(𝜃1) = K/50 | p(𝜃2) = K/50+0,16 | p(𝜃3) = K/50 +0,2 | p(𝜃4) = 0,64-3*K/50
  pTita: number[] = [];
  V1: number[] = [];
  V2: number[] = [-100000, 50000, 100000, 200000];

  pEpsTita: number[][] = [];

  pTitaEps: number[][] = [];
  pEps: number[] = [];

  maxOfVSumProdPTitaEps: number[] = [];
  maxOfVSumProdPtita: number = 0;
  finalResult: number = 0;

  constructor() {}

  ngOnInit() {}

  sumOfArray(arr: number[]) {
    return arr.reduce((a, b) => a + b, 0);
  }

  sumProductOfArray(arr1: number[], arr2: number[]) {
    let sum = 0;
    for (let i = 0; i < arr1.length; i++) {
      sum += arr1[i] * arr2[i];
    }
    return sum;
  }

  solve() {
    if (this.K != null) {
      this.V1[0] = 15000 + this.K! * 1000;
      this.V1[1] = 15000 + this.K! * 1000;
      this.V1[2] = 15000 + this.K! * 1000;
      this.V1[3] = 15000 + this.K! * 1000;

      this.pTita[0] = this.K! / 50;
      this.pTita[1] = this.K! / 50 + 0.16;
      this.pTita[2] = this.K! / 50 + 0.2;
      this.pTita[3] = 0.64 - (3 * this.K!) / 50;

      this.pEpsTita[0] = [
        this.multi[0][0] / this.sumOfArray(this.multi[0]),
        this.multi[0][1] / this.sumOfArray(this.multi[0]),
        this.multi[0][2] / this.sumOfArray(this.multi[0]),
      ];
      this.pEpsTita[1] = [
        this.multi[1][0] / this.sumOfArray(this.multi[1]),
        this.multi[1][1] / this.sumOfArray(this.multi[1]),
        this.multi[1][2] / this.sumOfArray(this.multi[1]),
      ];
      this.pEpsTita[2] = [
        this.multi[2][0] / this.sumOfArray(this.multi[2]),
        this.multi[2][1] / this.sumOfArray(this.multi[2]),
        this.multi[2][2] / this.sumOfArray(this.multi[2]),
      ];
      this.pEpsTita[3] = [
        this.multi[3][0] / this.sumOfArray(this.multi[3]),
        this.multi[3][1] / this.sumOfArray(this.multi[3]),
        this.multi[3][2] / this.sumOfArray(this.multi[3]),
      ];

      this.pEps[0] = this.sumProductOfArray(this.pTita, [
        this.pEpsTita[0][0],
        this.pEpsTita[1][0],
        this.pEpsTita[2][0],
        this.pEpsTita[3][0],
      ]);
      this.pEps[1] = this.sumProductOfArray(this.pTita, [
        this.pEpsTita[0][1],
        this.pEpsTita[1][1],
        this.pEpsTita[2][1],
        this.pEpsTita[3][1],
      ]);
      this.pEps[2] = this.sumProductOfArray(this.pTita, [
        this.pEpsTita[0][2],
        this.pEpsTita[1][2],
        this.pEpsTita[2][2],
        this.pEpsTita[3][2],
      ]);

      this.pTitaEps[0] = [
        (this.pTita[0] * this.pEpsTita[0][0]) / this.pEps[0],
        (this.pTita[1] * this.pEpsTita[1][0]) / this.pEps[0],
        (this.pTita[2] * this.pEpsTita[2][0]) / this.pEps[0],
        (this.pTita[3] * this.pEpsTita[3][0]) / this.pEps[0],
      ];
      this.pTitaEps[1] = [
        (this.pTita[0] * this.pEpsTita[0][1]) / this.pEps[1],
        (this.pTita[1] * this.pEpsTita[1][1]) / this.pEps[1],
        (this.pTita[2] * this.pEpsTita[2][1]) / this.pEps[1],
        (this.pTita[3] * this.pEpsTita[3][1]) / this.pEps[1],
      ];
      this.pTitaEps[2] = [
        (this.pTita[0] * this.pEpsTita[0][2]) / this.pEps[2],
        (this.pTita[1] * this.pEpsTita[1][2]) / this.pEps[2],
        (this.pTita[2] * this.pEpsTita[2][2]) / this.pEps[2],
        (this.pTita[3] * this.pEpsTita[3][2]) / this.pEps[2],
      ];
      this.maxOfVSumProdPTitaEps[0] = Math.max(
        this.sumProductOfArray(this.V1, this.pTitaEps[0]),
        this.sumProductOfArray(this.V2, this.pTitaEps[0])
      );
      this.maxOfVSumProdPTitaEps[1] = Math.max(
        this.sumProductOfArray(this.V1, this.pTitaEps[1]),
        this.sumProductOfArray(this.V2, this.pTitaEps[1])
      );
      this.maxOfVSumProdPTitaEps[2] = Math.max(
        this.sumProductOfArray(this.V1, this.pTitaEps[2]),
        this.sumProductOfArray(this.V2, this.pTitaEps[2])
      );
      this.finalResult = this.sumProductOfArray(
        this.maxOfVSumProdPTitaEps,
        this.pEps
      );
      this.maxOfVSumProdPtita = Math.max(
        this.sumProductOfArray(this.V1, this.pTita),
        this.sumProductOfArray(this.V2, this.pTita)
      );
      this.solved = true;
    }
  }
}
