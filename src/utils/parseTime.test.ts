import parseTime from './parseTime';



describe('test of parsteTime util: ', () => {
  
  it("should return 00:00:00 object", () => {
    expect(parseTime(0)).toHaveProperty('seconds', '00');
    expect(parseTime(0)).toHaveProperty('minutes', '00');
    expect(parseTime(0)).toHaveProperty('hours', '00');
  });

})