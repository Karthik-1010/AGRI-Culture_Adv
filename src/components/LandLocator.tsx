import { useState, type FormEvent } from 'react';
import { ExternalLink, LoaderCircle, MapPin, Search } from 'lucide-react';
import { getSessionId } from '../lib/session';

type LocationSearchResponse = {
  latitude: number;
  longitude: number;
  display_name: string;
  saved?: boolean;
  warning?: string;
};

type LocatedPlace = {
  latitude: number;
  longitude: number;
  name: string;
  warning?: string;
};

export function LandLocator() {
  const [query, setQuery] = useState('');
  const [place, setPlace] = useState<LocatedPlace | null>(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const searchLocation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const address = query.trim();
    if (!address || isSearching) return;

    setError('');
    setPlace(null);
    setIsSearching(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL ?? ''}/api/locations/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: address, session_id: getSessionId() }),
      });
      let result: LocationSearchResponse | { detail?: string };
      try {
        result = await response.json() as LocationSearchResponse | { detail?: string };
      } catch {
        throw new Error(
          response.ok
            ? 'The location service returned an invalid response. Please try again.'
            : response.status === 404
              ? 'The GreenHarvest API endpoint was not found. Deploy the backend and set VITE_API_BASE_URL to its URL in Vercel, then redeploy the frontend.'
            : `Location search failed (HTTP ${response.status}). Check the backend logs.`,
        );
      }
      if (!response.ok) {
        throw new Error('detail' in result && result.detail
          ? result.detail
          : `Location search failed (HTTP ${response.status}).`);
      }

      if (
        !result
        || !('latitude' in result)
        || !Number.isFinite(result.latitude)
        || !Number.isFinite(result.longitude)
        || !result.display_name
      ) {
        throw new Error('The location service returned an invalid result. Please try again.');
      }

      setPlace({
        latitude: result.latitude,
        longitude: result.longitude,
        name: result.display_name,
        warning: result.saved === false ? result.warning : undefined,
      });
    } catch (searchError) {
      setError(searchError instanceof TypeError
        ? 'Cannot connect to the GreenHarvest API. Start the backend locally or configure VITE_API_BASE_URL to your deployed backend URL.'
        : searchError instanceof Error
          ? searchError.message
          : 'Unable to search this location right now.');
    } finally {
      setIsSearching(false);
    }
  };

  const mapUrl = place
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${place.longitude - 0.004}%2C${place.latitude - 0.004}%2C${place.longitude + 0.004}%2C${place.latitude + 0.004}&layer=mapnik&marker=${place.latitude}%2C${place.longitude}`
    : '';
  const externalMapUrl = place
    ? `https://www.openstreetmap.org/?mlat=${place.latitude}&mlon=${place.longitude}#map=16/${place.latitude}/${place.longitude}`
    : '';

  return (
    <section id="land-locator" className="bg-[#F8FAF8] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E8EFEA] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#26734D]">
            <MapPin className="h-4 w-4" />
            Field location search
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#174B35] sm:text-4xl">
            Find a Farm Location
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            Search an address, farm name, or place to view its location on the map.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl border border-[#D2E0D5] bg-white shadow-soft-xl">
          <form onSubmit={searchLocation} className="flex flex-col gap-3 p-5 sm:flex-row">
            <label htmlFor="farm-location" className="sr-only">
              Farm address or location
            </label>
            <input
              id="farm-location"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              maxLength={250}
              placeholder="Enter a farm address, town, or place"
              className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#26734D] focus:outline-none focus:ring-2 focus:ring-[#26734D]/20"
              disabled={isSearching}
            />
            <button
              type="submit"
              disabled={isSearching || !query.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#26734D] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#174B35] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSearching
                ? <LoaderCircle className="h-4 w-4 animate-spin" />
                : <Search className="h-4 w-4" />}
              Search map
            </button>
          </form>

          {error && (
            <p role="alert" className="px-5 pb-4 text-sm text-rose-700">
              {error}
            </p>
          )}

          {place ? (
            <>
              <div className="flex flex-col gap-2 border-t border-[#D2E0D5] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#26734D]" />
                  <span>{place.name}</span>
                </div>
                <a
                  href={externalMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#26734D] hover:text-[#174B35]"
                >
                  Open full map
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              {place.warning && (
                <p role="status" className="border-t border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-900">
                  {place.warning}
                </p>
              )}
              <iframe
                title={`Map location for ${place.name}`}
                src={mapUrl}
                className="h-80 w-full border-0 sm:h-96"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </>
          ) : (
            <div className="flex h-64 items-center justify-center border-t border-[#D2E0D5] bg-[#F8FAF8] px-6 text-center text-sm text-gray-500 sm:h-80">
              Search for a location to see the map and its coordinates.
            </div>
          )}
          <p className="border-t border-[#D2E0D5] px-5 py-3 text-xs leading-relaxed text-gray-500">
            Map results identify a place and its approximate location; they do not
            establish property ownership, surveyed boundaries, or parcel area. Map
            data © OpenStreetMap contributors. Address searches are stored
            indefinitely when the Supabase database allows them.
          </p>
        </div>
      </div>
    </section>
  );
}
