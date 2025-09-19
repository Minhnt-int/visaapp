'use client'

import { useHits } from 'react-instantsearch';

export function CustomHits(props: any) {
  const { hits } = useHits(props);

  return (
    <div>
      {hits.length === 0 && <p className="p-4 text-gray-500">Không tìm thấy kết quả.</p>}
      <ul>
        {hits.map((hit: any) => (
          <li key={hit.objectID} className="border-b last:border-b-0">
            <props.hitComponent hit={hit} />
          </li>
        ))}
      </ul>
    </div>
  );
}
