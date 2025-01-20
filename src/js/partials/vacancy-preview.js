class VacancyPreview {
  constructor(element) {
    this.element = element;
    this.container = element.querySelector('.js-hidden-content-container');
    this.content = element.querySelector('.js-hidden-content');
    this.toggleBtn = element.querySelector('.js-toggle-btn');

    this.vacancyPreviewOpenedClassName = 'vacancy-preview_opened';

    this.initHandlers();
  }

  isOpened() {
    return this.element.classList.contains(this.vacancyPreviewOpenedClassName);
  }

  open() {
    this.element.classList.add(this.vacancyPreviewOpenedClassName);

    this.container.style.height = this.content.clientHeight + 'px';

    this.toggleBtn.innerText = 'Скрыть';
  }

  close() {
    this.container.style.removeProperty('height');

    this.element.classList.remove(this.vacancyPreviewOpenedClassName);
  
    this.toggleBtn.innerText = 'Подробнее';
  }

  initHandlers() {
    this.toggleBtn.addEventListener('click', () => {
      if (this.isOpened()) {
        this.close();

        return;
      }

      this.open();
    });

    window.addEventListener('resize', () => {
      if (this.isOpened()) {
        this.container.style.height = this.content.clientHeight + 'px';
      }
    })
  }
}
