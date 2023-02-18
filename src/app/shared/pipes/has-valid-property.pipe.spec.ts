import { HasValidPropertyPipe } from './has-valid-property.pipe';

describe('HasValidPropertyPipe', () => {
  it('create an instance', () => {
    const pipe = new HasValidPropertyPipe();
    expect(pipe).toBeTruthy();
  });
});
