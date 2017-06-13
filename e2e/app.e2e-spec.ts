import { GliPage } from './app.po';

describe('gli App', () => {
  let page: GliPage;

  beforeEach(() => {
    page = new GliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
