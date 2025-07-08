import { effect, Injectable, signal } from '@angular/core';
import { driver, DriveStep } from "driver.js";

@Injectable({
  providedIn: 'root'
})
export class TasksTourService {
  private steps = signal<DriveStep[]>([]);
  private readonly driver = driver(
    {
      nextBtnText: 'Дальше',
      prevBtnText: 'Вернуться',
      doneBtnText: 'Закрыть',
    }
  );
  private readonly expectedStepsCount = 2;
  private readonly initialTourPlayed = signal(false);
  private readonly stepsEffect = effect(() => {
    if(this.steps().length === this.expectedStepsCount && !this.initialTourPlayed()) {
      this.startTour();
      this.initialTourPlayed.set(true);
    }
  })

  public registerStep(step: DriveStep) {
    this.steps.update(steps => [...steps, step]);
  }

  public startTour() {
    if(this.steps().length === this.expectedStepsCount) {
      this.driver.setSteps(this.steps());
      this.driver.drive();
    }
  }
}

