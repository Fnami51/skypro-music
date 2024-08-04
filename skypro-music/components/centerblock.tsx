'use client';

import Image from "next/image";
import styles from "./style_components/centerblock.module.css";
import Sound from "./track";
import classNames from "classnames";
import { useEffect, useState } from "react";

import {Track} from '@interface/tracksInterface';

interface CenterblockProps {
  playlist: Track[];
  title: string;
}

type YearSortType = 'default' | 'new' | 'old';

export default function Centerblock({ playlist, title }: CenterblockProps) {
  const [filter, setFilter] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredTracks, setFilteredTracks] = useState<Track[]>(playlist);
  const [selectedAuthors, setSelectedAuthors] = useState<Set<string>>(new Set());
  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set());
  const [yearSort, setYearSort] = useState<YearSortType>('default'); 

  console.log("Tracks in Centerblocks", playlist)

  const filteredAuthors: string[] = playlist
    .map(track => track.author)
    .filter((value, index, self) => self.indexOf(value) === index);

  const filteredGenres: string[] = playlist
    .map(track => track.genre)
    .filter((value, index, self) => self.indexOf(value) === index);

  function selectFilter(filterNumber: number) {
    setFilter(filter !== filterNumber ? filterNumber : 0);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      filterTracks();
    }
  };

  function searchTracksByName(partOfName: string, tracks: Track[]): Track[] {
    const lowerCasePart = partOfName.toLowerCase();
    return tracks.filter(track =>
      track.name.toLowerCase().includes(lowerCasePart)
    );
  }

  function filterTracks() {
    let newFilteredTracks = playlist;

    if (searchQuery) {
      newFilteredTracks = searchTracksByName(searchQuery, newFilteredTracks);
    }

    if (selectedAuthors.size > 0) {
      newFilteredTracks = newFilteredTracks.filter(track => selectedAuthors.has(track.author));
    }

    if (selectedGenres.size > 0) {
      newFilteredTracks = newFilteredTracks.filter(track => selectedGenres.has(track.genre));
    }

    if (yearSort === 'new') {
      newFilteredTracks = [...newFilteredTracks].sort((a, b) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    } else if (yearSort === 'old') {
      newFilteredTracks = [...newFilteredTracks].sort((a, b) =>
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
      );
    }

    setFilteredTracks(newFilteredTracks);
  }

  const toggleAuthor = (author: string) => {
    setSelectedAuthors(prev => {
      const newSet = new Set(prev);
      if (newSet.has(author)) {
        newSet.delete(author);
      } else {
        newSet.add(author);
      }
      return newSet;
    });
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => {
      const newSet = new Set(prev);
      if (newSet.has(genre)) {
        newSet.delete(genre);
      } else {
        newSet.add(genre);
      }
      return newSet;
    });
  };

  const handleYearSortChange = (sortType: YearSortType) => {
    setYearSort(sortType);
  };

  useEffect(() => {
    filterTracks();
  }, [searchQuery, selectedAuthors, selectedGenres, yearSort]);

  return (
    <div className={styles.background}>
      <div className={styles.search}>
        <svg className={styles.searchSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className={styles.input}
          type="search"
          placeholder="Поиск"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <h2 className={styles.heading}>{title}</h2>
      <div className={styles.filter}>
        <div className={styles.filterTitle}>Искать по:</div>
        <div>
          <button className={classNames(styles.filterBtn, styles.btnText)} onClick={() => selectFilter(1)}>
            исполнителю
          </button>
          <div className={styles.filterSelections} style={{ display: filter === 1 ? 'flex' : 'none' }}>
            {filteredAuthors.map(author => (
              <div key={`${author}${Math.random()}`}>
                <input
                  type="checkbox"
                  name="author-select"
                  id={author}
                  className={styles.selectInput}
                  checked={selectedAuthors.has(author)}
                  onChange={() => toggleAuthor(author)}
                />
                <label
                  htmlFor={author}
                  className={classNames(styles.selectLabel, {
                    [styles.selectedLabel]: selectedAuthors.has(author)
                  })}
                >
                  {author}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <button className={classNames(styles.filterBtn, styles.btnText)} onClick={() => selectFilter(3)}>
            жанру
          </button>
          <div className={styles.filterSelections} style={{ display: filter === 3 ? 'flex' : 'none' }}>
            {filteredGenres.map(genre => (
              <div key={`${genre}${Math.random()}`}>
                <input
                  type="checkbox"
                  name="genre-select"
                  id={genre}
                  className={styles.selectInput}
                  checked={selectedGenres.has(genre)}
                  onChange={() => toggleGenre(genre)}
                />
                <label
                  htmlFor={genre}
                  className={classNames(styles.selectLabel, {
                    [styles.selectedLabel]: selectedGenres.has(genre)
                  })}
                >
                  {genre}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <button className={classNames(styles.filterBtn, styles.btnText)} onClick={() => selectFilter(2)}>
            году выпуска
          </button>
          <div className={styles.filterSelectionYear} style={{ display: filter === 2 ? 'flex' : 'none' }}>
            <div>
              <input
                type="radio"
                name="year-select"
                id="defaultYearSelect"
                className={styles.selectInput}
                checked={yearSort === 'default'}
                onChange={() => handleYearSortChange('default')}
              />
              <label
                htmlFor="defaultYearSelect"
                className={classNames(styles.selectLabel, {
                  [styles.selectedLabel]: yearSort === 'default'
                })}
              >
                По умолчанию
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="year-select"
                id="newYearSelect"
                className={styles.selectInput}
                checked={yearSort === 'new'}
                onChange={() => handleYearSortChange('new')}
              />
              <label
                htmlFor="newYearSelect"
                className={classNames(styles.selectLabel, {
                  [styles.selectedLabel]: yearSort === 'new'
                })}
              >
                Сначала новые
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="year-select"
                id="oldYearSelect"
                className={styles.selectInput}
                checked={yearSort === 'old'}
                onChange={() => handleYearSortChange('old')}
              />
              <label
                htmlFor="oldYearSelect"
                className={classNames(styles.selectLabel, {
                  [styles.selectedLabel]: yearSort === 'old'
                })}
              >
                Сначала старые
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          <div className={classNames(styles.playlistTitle, styles.column1)}>Трек</div>
          <div className={classNames(styles.playlistTitle, styles.column2)}>Исполнитель</div>
          <div className={classNames(styles.playlistTitle, styles.column3)}>Альбом</div>
          <div className={classNames(styles.playlistTitle, styles.column4)}>
            <svg className={styles.playlistSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.playlist}>
          {filteredTracks.map(track => (
            <Sound key={`${track.id}+${Math.random()}`} track={track} playlist={playlist} />
          ))}
        </div>
      </div>
    </div>
  );
}
