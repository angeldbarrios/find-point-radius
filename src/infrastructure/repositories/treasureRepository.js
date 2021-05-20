'use strict';

const sequelizeManager = require('../orm/sequealize-manager');
const { QueryTypes } = require('sequelize');

module.exports = class {
  constructor() {
    this.Treasure = sequelizeManager.Treasure;
    this.sequelize = sequelizeManager.sequelize;
    this.distanceUnitPerDegree = 111.045;
  }

  async findBox({ latitude, longitude, distance, priceValue }) {
    const result = await this.sequelize.query(`
    SELECT d.id, d.latitude, d.longitude, d.distance, d.name, mv.amt
    FROM (
         SELECT
          id,
          latitude,
          longitude,
          name,
          p.radius,
            DEGREES(
            p.distance_unit * ACOS(
                LEAST(
                    1.0,
                    COS( RADIANS(p.latpoint) ) *
                    COS( RADIANS(latitude) ) *
                    COS( RADIANS(p.longpoint) - RADIANS(longitude) ) +
                    SIN( RADIANS(p.latpoint) ) *
                    SIN( RADIANS(latitude) )
                  )
                )
              ) AS distance
              FROM treasures AS t
              JOIN (
                SELECT :latpoint AS latpoint, :longpoint AS longpoint,
                       :radius AS radius, ${this.distanceUnitPerDegree} AS distance_unit
              ) AS p
              WHERE 
                t.latitude BETWEEN p.latpoint - (p.radius / p.distance_unit) 
                               AND p.latpoint + (p.radius / p.distance_unit)
                AND
    
                t.longitude BETWEEN p.longpoint - (p.radius / (p.distance_unit * COS(RADIANS(p.latpoint) ) ) )
                                AND p.longpoint + (p.radius / (p.distance_unit * COS(RADIANS(p.latpoint) ) ) )
        ) AS d
        INNER JOIN (
          SELECT treasure_id, MIN(amt) as amt
          FROM money_values AS mv
          WHERE ${priceValue ? 'amt >= :priceValue' : '1'}
          GROUP BY treasure_id        
      )  as mv ON d.id = mv.treasure_id

      WHERE distance <= radius
      ORDER BY distance`, {
      replacements: {
        latpoint: latitude,
        longpoint: longitude,
        radius: distance,
        priceValue: priceValue
      },
      type: QueryTypes.SELECT
    });

    return result;
  }
}