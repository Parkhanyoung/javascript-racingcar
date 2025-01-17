import Car from "./Car.js";
import { ERROR_MESSAGE } from "../constants/message.js";
import RandomUtil from "../utils/RandomUtil.js";

export default class Cars {
  static MIN_LENGTH = 2;
  static MAX_LENGTH = 100;

  static MIN_RANDOM_NUMBER = 0;
  static MAX_RANDOM_NUMBER = 9;

  #cars;

  constructor(cars) {
    this.#validate(cars);
    this.#cars = cars;
  }

  goAll(numbers = this.#pickRandomNumbers(this.#cars.length)) {
    this.#cars.forEach((car, index) => car.go(numbers[index]));
  }

  getMileageBoard() {
    return this.#cars.map((car) => ({ name: car.getName(), mileage: car.getMileage() }));
  }

  getFirstPlaceNames() {
    const firstPlaceCars = this.#getFirstPlaces();
    return firstPlaceCars.map((car) => car.getName());
  }

  #validate(cars) {
    this.#validateType(cars);
    this.#validateLength(cars);
    this.#validateUnique(cars);
  }

  #validateType(cars) {
    if (!cars.every((car) => car instanceof Car)) {
      throw new Error(ERROR_MESSAGE.notCarType);
    }
  }

  #validateLength(cars) {
    if (cars.length < Cars.MIN_LENGTH || cars.length > Cars.MAX_LENGTH) {
      throw new Error(ERROR_MESSAGE.invalidCarLength);
    }
  }

  #validateUnique(cars) {
    const names = cars.map((car) => car.getName());

    if (new Set(names).size !== names.length) {
      throw new Error(ERROR_MESSAGE.duplicateCarName);
    }
  }

  #pickRandomNumbers(length) {
    return RandomUtil.pickRandomNumbers(Cars.MIN_RANDOM_NUMBER, Cars.MAX_RANDOM_NUMBER, length);
  }

  #getFirstPlaces() {
    const maxMileage = this.#getMaxMileage();
    return this.#cars.filter((car) => car.getMileage() === maxMileage);
  }

  #getMaxMileage() {
    return Math.max(...this.#cars.map((car) => car.getMileage()));
  }
}
