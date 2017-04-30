"use strict";
{
  const fs = require('fs');
  const morphemes = JSON.parse( fs.readFileSync( process.argv[2] || 'dict.json', { encoding: 'utf8' } ) );
  morphemes.sort( (a,b)=>b.cover - a.cover);
  const parts = require('./uri_parts.js');

  let minCover = morphemes[0].cover;
  let maxCover = morphemes[0].cover;
  let totalCover = 0;
  let statsByLength = [];


  for( const m of morphemes ) {
    if ( m.cover < minCover ) {
      minCover = m.cover;
    }
    if ( m.cover > maxCover ) {
      maxCover = m.cover;
    }
    totalCover += m.cover;
    const len = m.morpheme.length;
    let lenStats = statsByLength[len];
    if ( ! lenStats ) {
      lenStats = statsByLength[len] = {
        len,
        totalCover: 0,
        list: [],
        min: m.cover,
        max: m.cover
      };
    }
    lenStats.totalCover += m.cover;
    if ( m.cover < lenStats.min ) {
      lenStats.min = m.cover;
    }
    if ( m.cover > lenStats.max ) {
      lenStats.max = m.cover;
    }
    lenStats.list.push(m);
  }

  const avgCover = totalCover / morphemes.length;
  const medianCover = morphemes[Math.floor(morphemes.length / 2)].cover;

  for ( const lenStats of statsByLength ) {
    if ( !lenStats ) continue;
    lenStats.list.sort((a,b)=>b.cover - a.cover );
    lenStats.avgCover = lenStats.totalCover / lenStats.list.length;
    lenStats.medianCover = lenStats.list[Math.floor(lenStats.list.length / 2 )].cover;
  }
  
  const result = {
    avgCover,
    medianCover,
    totalCover,
    minCover,
    maxCover,
    statsByLength
  }
  
  //console.log( JSON.stringify( result, null, 2 ) );
}
