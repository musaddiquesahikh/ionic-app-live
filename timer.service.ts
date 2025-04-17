import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timerInterval: any;
  public timeElapsed: number = 0;
  public isRunning: boolean = false; // Flag to check if timer is running
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const startTime = await this.storage.get('startTime');
    if (startTime) {
      this.isRunning = true;
      this.startTimer(startTime);
    }
  }

  async punchIn() {
    const startTime = new Date().getTime();
    await this.storage.set('startTime', startTime);
    this.isRunning = true;
    this.startTimer(startTime);
  }

  async punchOut() {
    await this.stopTimer();
    this.isRunning = false;
  }

  private startTimer(startTime: number) {
    this.stopTimer(); // Clear any existing timer
    this.timerInterval = setInterval(() => {
      this.timeElapsed = new Date().getTime() - startTime;
    }, 1000);
  }

  private async stopTimer() {
    clearInterval(this.timerInterval);
    await this.storage.remove('startTime');
    this.timeElapsed = 0;
  }
}
