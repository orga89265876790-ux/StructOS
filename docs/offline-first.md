# StructOS Offline-First Contract

## Product requirement

All core operations on a construction site must work without a stable internet connection. Data is saved locally and synchronized automatically when connectivity returns.

Server-only exceptions are new AI analysis, external messages, current supplier offers, and other operations that objectively require live server data.

## Roles

- **Server / StructOS Cloud** is the authoritative data source.
- **Device** is the working local copy used by the application online and offline.
- **Sync Engine** continuously captures device changes, keeps an outbox, sends pending mutations, and pulls acknowledged server state.

## Connectivity states

1. **Online:** Device ↔ StructOS Cloud.
2. **Offline:** the device continues to work; mutations are written to IndexedDB and kept in the outbox.
3. **Connection restored:** the Sync Engine runs automatically and reconciles the outbox with the server.

## Client persistence

The client database `structos-offline-sync-v1` contains:

- `snapshots`: the latest local working copy by data category;
- `outbox`: the latest unacknowledged local mutation by category;
- `conflicts`: server/device collisions that must not be silently overwritten;
- `meta`: device readiness, server cursor, and last synchronization timestamps.

The current categories are projects, staff, finance, warehouse/materials, documents/reports, and profile/settings. Existing binary files remain in their dedicated IndexedDB stores; the synchronization snapshot contains their local identifiers and metadata.

## Server transport contract

The UI and local engine do not depend on a specific backend table. A server adapter must implement:

- `isAvailable(context)`;
- `push(records, context)` returning acknowledged records and conflicts;
- `pull(cursor, context)` returning authoritative records and the next cursor.

Every pushed mutation carries a stable device ID, category fingerprint, update time, and base server revision. The server must reject stale base revisions instead of silently overwriting newer server data. The client removes an outbox record only after an explicit acknowledgement with the same fingerprint.

When the Supabase data model is introduced, its tables must have Row Level Security enabled and all rows must be scoped to `auth.uid()`. Schema changes must be applied through versioned migrations.

