export type AnalogReadObserver = (reading: number) => void;

class AnalogReadSubject {
  private observers: AnalogReadObserver[] = [];

  public attach(observer: AnalogReadObserver) {
    this.observers.push(observer);
    console.log(this.observers.length);
  }

  public detach(observerToRemove: AnalogReadObserver) {
    this.observers = this.observers.filter(
      (observer) => observerToRemove.toString() !== observer.toString()
    );
  }

  public updateReading(reading: number) {
    this.notify(reading);
  }

  public notify(reading: number) {
    this.observers.forEach((observer) => observer(reading));
  }
}

const analogReadSubject = new AnalogReadSubject();

export default analogReadSubject;
