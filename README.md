Given a latitude and longitude detect how many locations are within 1km / 10 (km)

API Endpoint (Geolocation)

1. Create one api end point for the following
  A. Find treasure boxes within 1km/10 (km) with the following input
  1. latitude: 1.3273451
  2. longitude: 103.8756757
  3. distance: 1 or 10 (km)

Ensure proper validations are done. All fields are required. Distance only accepts
1km/10km and any other value must not be accepted


  B. Find treasure boxes that have a value of more than $10 (inclusive) prize_value value
  within 1km / 10 (km) with the following input.
    1. latitude: 1.3273451
    2. longitude: 103.8756757
    3. distance: 1 or 10
    4. Prize value: $10 to $30

    As it is the same endpoint as (A) , prize value is an optional input. However, the prize
    value only accepts a range of $10 to $30. Only whole numbers are accepted. Values
    such as $10.50, $10.40 should not be accepted as they are decimal values.
    If a treasure has prize value $10, $20, $30. Only the minimum value must be
    considered.

TODOS:


2. Create a bonus endpoint which you think would be useful. Anything that comes in your
mind
3. Tests
4. Sequelize migrations
