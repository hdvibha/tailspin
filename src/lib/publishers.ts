/**
 * Provides database-access helpers for publisher records.
 *
 * The helpers accept an injectable database connection so page queries and
 * tests can use the same typed data-access functions.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Returns every publisher as a lightweight summary object.
 *
 * @param db - The injectable Drizzle database instance to query.
 * @returns A promise that resolves to publishers containing their ids and
 * names, ordered alphabetically for deterministic builds.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({
            id: publishers.id,
            name: publishers.name,
        })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((publisher) => ({
        id: publisher.id,
        name: publisher.name,
    }));
}
