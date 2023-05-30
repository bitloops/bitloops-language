import { pascalCase } from '../../src/utils/caseStyles.js';

describe('pascal casing', () => {
  it('should convert kebab-case to pascal case', () => {
    const input = 'driver-availability';

    const result = pascalCase(input);

    expect(result).toEqual('DriverAvailability');
  });

  it('should convert snake_case to pascal case', () => {
    const input = 'driver_availability';

    const result = pascalCase(input);

    expect(result).toEqual('DriverAvailability');
  });

  it('should convert camelCase to pascal case', () => {
    const input = 'driverAvailability';

    const result = pascalCase(input);

    expect(result).toEqual('DriverAvailability');
  });

  it('should convert PascalCase to pascal case', () => {
    const input = 'DriverAvailability';

    const result = pascalCase(input);

    expect(result).toEqual('DriverAvailability');
  });

  it('should convert space separated to pascal case', () => {
    const input = 'driver availability';

    const result = pascalCase(input);

    expect(result).toEqual('DriverAvailability');
  });

  it('should convert PascalCase with space to pascal case', () => {
    const input = 'Driver Availability';

    const result = pascalCase(input);

    expect(result).toEqual('DriverAvailability');
  });
});
