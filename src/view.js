import { $, $$, makeDOMDisplayNone, makeDOMDisplayNotNone, wait } from './utils/common.js';
import {
  ROUND_DELAY,
  SELECTOR,
  STEP_SIGN,
  WINNER_MESSAGE,
  WINNER_SEPARATOR,
  WIN_ALERT_DELAY,
} from './utils/constants.js';

export default class View {
  constructor() {
    this.configureDOM();
    this.makeResultDisplayNone();
    this.makeCountFormDisplayNone();
  }

  configureDOM() {
    this.$nameInput = $(SELECTOR.INPUT_SECTION_NAME_INPUT);
    this.$countInput = $(SELECTOR.INPUT_SECTION_COUNT_INPUT);
    this.$nameButton = $(SELECTOR.INPUT_SECTION_NAME_BUTTON);
    this.$countButton = $(SELECTOR.INPUT_SECTION_COUNT_BUTTON);
    this.$countSection = $(SELECTOR.COUNT_SECTION);
    this.$stepSections = $(SELECTOR.STEP_SECTIONS);
    this.$winner = $(SELECTOR.WINNER);
    this.$resetButton = $(SELECTOR.RESET_BUTTON);
  }

  makeDOMReset() {
    this.makeResultDisplayNone();
    this.makeCountFormDisplayNone();
    this.clearInput();
  }

  makeResultDisplayNotNone() {
    this.makeStepSectionsDisplayNotNone();
    this.makeWinnerDisplayNotNone();
    this.makeResetButtonDisplayNotNone();
  }

  makeResultDisplayNone() {
    this.makeStepSectionsDisplayNone();
    this.makeWinnerDisplayNone();
    this.makeResetButtonDisplayNone();
  }

  makeStepSectionsDisplayNotNone() {
    makeDOMDisplayNotNone(this.$stepSections, SELECTOR.STEP_SECTIONS_DISPLAY_NONE);
  }

  makeStepSectionsDisplayNone() {
    makeDOMDisplayNone(this.$stepSections, SELECTOR.STEP_SECTIONS_DISPLAY_NONE);
  }

  makeWinnerDisplayNotNone() {
    makeDOMDisplayNotNone(this.$winner, SELECTOR.WINNER_DISPLAY_NONE);
  }

  makeWinnerDisplayNone() {
    makeDOMDisplayNone(this.$winner, SELECTOR.WINNER_DISPLAY_NONE);
  }

  makeResetButtonDisplayNotNone() {
    makeDOMDisplayNotNone(this.$resetButton, SELECTOR.RESET_BUTTON_DISPLAY_NONE);
  }

  makeResetButtonDisplayNone() {
    makeDOMDisplayNone(this.$resetButton, SELECTOR.RESET_BUTTON_DISPLAY_NONE);
  }

  makeCountFormDisplayNone() {
    makeDOMDisplayNone(this.$countSection, SELECTOR.COUNT_SECTION_DISPLAY_NONE);
  }

  makeCountFormDisplayNotNone() {
    makeDOMDisplayNotNone(this.$countSection, SELECTOR.COUNT_SECTION_DISPLAY_NONE);
  }

  setOnSubmitName(fn) {
    this.$nameButton.addEventListener('click', (event) => {
      event.preventDefault();
      fn(this.$nameInput.value);
    });
  }

  setOnSubmitCount(fn) {
    this.$countButton.addEventListener('click', (event) => {
      event.preventDefault();
      fn(Number(this.$countInput.value));
    });
  }

  setOnClickReset(fn) {
    this.$resetButton.addEventListener('click', () => {
      this.makeDOMReset();
      fn();
    });
  }

  clearInput() {
    this.$nameInput.value = '';
    this.$countInput.value = '';
  }

  generateStepSection(car) {
    return `
    <section class="${SELECTOR.STEP_SECTION}">
      <span class="${SELECTOR.STEP_SECTION_NAME}">${car.name}</span>
      <ul class="${SELECTOR.STEP_SECTION_ARROWS}">
        <li class="${SELECTOR.STEP_SECTION_LOADING}"></li>
      </ul>
    </section>
  `;
  }

  generateStepSections(carList) {
    this.$stepSections.innerHTML = carList.map((car) => this.generateStepSection(car)).join('');
    this.$stepSectionArrowsArray = Array.from($$(SELECTOR.STEP_SECTION_ARROWS));
  }

  async showAllResult(carList, winnerList) {
    await this.showRacingProcess(carList);
    this.showWinnerResult(winnerList);
  }

  async showRacingProcess(carList) {
    this.makeWinnerDisplayNone();
    this.makeResetButtonDisplayNone();
    this.makeStepSectionsDisplayNotNone();
    this.generateStepSections(carList);
    await this.showStepSection(carList);
    this.removeSpinner();
  }

  async showWinnerResult(winnerList) {
    this.makeWinnerDisplayNotNone();
    this.makeResetButtonDisplayNotNone();
    this.showWinner(winnerList);
    await wait(WIN_ALERT_DELAY);
    this.showWinnerByAlert(winnerList);
  }

  async showStepSection(carList) {
    const count = carList[0].stepByRound.length;
    for (let i = 0; i < count; i++) {
      await wait(ROUND_DELAY);
      this.updateRound(carList, i);
    }
  }

  updateRound(carList, i) {
    const stepSectionArrowTemplate = `<li class="${SELECTOR.STEP_SECTION_ARROW}">⬇️️</li>`;
    carList.map((car, j) => {
      if (car.stepByRound[i] === STEP_SIGN.GO) {
        this.$stepSectionArrowsArray[j].innerHTML += stepSectionArrowTemplate;
      }
    });
  }

  removeSpinner() {
    const $stepSectionLoadings = Array.from($$(SELECTOR.STEP_SECTION_LOADING));
    $stepSectionLoadings.forEach(($loading) => $loading.remove());
  }

  showWinner(winnerList) {
    this.$winner.innerText = `🏆 최종 우승자: ${winnerList.join(`${WINNER_SEPARATOR} `)} 🏆`;
  }

  showWinnerByAlert(winnerList) {
    alert(WINNER_MESSAGE(winnerList));
  }
}