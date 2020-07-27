import db from '../../db/config/db.config';
import { QueryTypes } from 'sequelize';

export const removeComment = async (id: string): Promise<any> => {
  const query = `DELETE FROM comments WHERE id = :id`;
  
  await db.sequelize.query(query, {
    type: QueryTypes.DELETE,
    replacements: { id }
  });
};
