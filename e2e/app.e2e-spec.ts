import { PoliRoomPage } from './app.po';

describe('poli-room App', function() {
  let page: PoliRoomPage;

  beforeEach(() => {
    page = new PoliRoomPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
