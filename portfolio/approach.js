'use strict';
(() => {
  const tabs = [...document.querySelectorAll('[data-case]')];
  const panel = document.getElementById('case-panel');
  const examples = {
    predict: {
      context: 'Predictive analytics · Individual UCL coursework',
      title: 'What signals passenger satisfaction?',
      summary: 'Compare classification models and examine which survey and journey features are most useful for prediction.',
      method: 'Preprocessing pipelines, model comparison and tuned XGBoost, evaluated on a held-out test set.',
      caveat: 'Online boarding ranks highly by model gain. Predictive importance does not establish a causal effect on satisfaction.',
      image: 'assets/airline-feature-importance.png',
      alt: 'Saved chart of XGBoost feature importance from the airline satisfaction project',
      caption: 'Saved feature-importance figure from the original analysis.',
      link: 'https://github.com/leyasherman/airline-passenger-satisfaction-ml/blob/main/reports/report.md'
    },
    understand: {
      context: 'Business analytics · UCL coursework',
      title: 'How does station demand change around events?',
      summary: 'Compare event and non-event demand at Wembley stations to investigate patterns around matches and concerts.',
      method: 'Daily entry and exit counts, event-calendar joins, station comparisons and OLS regression.',
      caveat: 'The shuttle scenario assumes a 20% reduction in event-day flows. It is an illustrative input, not a measured intervention effect.',
      image: 'assets/wembley-station-demand.png',
      alt: 'Saved chart comparing average passenger flows at Wembley stations on event and non-event days',
      caption: 'Saved event/non-event station comparison from the coursework.',
      link: 'https://github.com/leyasherman/wembley-transport-business-analytics/blob/main/TFL_final.ipynb'
    },
    connect: {
      context: 'Data engineering · UCL group coursework',
      title: 'How can fragmented sources support one analysis?',
      summary: 'Bring property and recorded-crime sources into a shared pipeline so analysts can investigate location-based housing questions.',
      method: 'Python and PySpark transformations, typed cleaning and Parquet output. My role covered planning, documentation, coordination and the analytical narrative.',
      caveat: 'The diagram describes the wider group design; the public repository contains a selected implementation snapshot. Crime proximity is not a validated safety score.',
      image: 'assets/london-pipeline.png',
      alt: 'Architecture diagram showing the wider London property and crime data pipeline',
      caption: 'Architecture diagram from the group report; some components are outside the public snapshot.',
      link: 'https://github.com/leyasherman/london-property-safety-data-engineering/blob/main/report.md'
    }
  };
  function selectTab(tab, focus = false) {
    const example = examples[tab.dataset.case];
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', tab.id);
    for (const field of ['context', 'title', 'summary', 'method', 'caveat', 'caption']) {
      document.getElementById(`case-${field}`).textContent = example[field];
    }
    const image = document.getElementById('case-image');
    image.alt = example.alt;
    image.src = example.image;
    document.getElementById('case-image-link').href = example.image;
    document.getElementById('case-link').href = example.link;
    if (focus) tab.focus();
  }
  document.querySelector('.case-tabs').hidden = false;
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        selectTab(tabs[next], true);
      }
    });
  });
})();
