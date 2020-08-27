import db from '../../db/config/db.config';
import { QueryTypes } from 'sequelize';

export const updateLogo = async (accountId: string, logo: Buffer) => {
  return db.sequelize.transaction(async () => {
    const query = `
      UPDATE accounts
      SET logo = ?, modified_date_time = ?
      WHERE id = ?;
    `;

    await db.sequelize.query(query, {
      type: QueryTypes.UPDATE,
      replacements: [logo, new Date(), accountId]
    });

    return logo;
  });
};

export const removeLogo = async (accountId: string): Promise<any> => {
  return db.sequelize.transaction(async () => {
    const query = `
      UPDATE accounts
      SET logo = NULL
      WHERE id = :accountId;
    `;
    await db.sequelize.query(query, {
      type: QueryTypes.UPDATE,
      replacements: { accountId }
    });
  });
};
