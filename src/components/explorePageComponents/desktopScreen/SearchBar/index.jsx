"use client";

import Image from "next/image";

import styles from "./SearchBar.module.css";


const SearchBar = ({
  placeholder = "Search...",
  value,
  onChange,
  onSubmit,
  maxWidth = 627,
  ariaLabel,
  className = "",
}) => (
  <div className={`${styles.searchBar} ${className}`} style={{ maxWidth }}>
    <input
      type="search"
      className={styles.searchInput}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={(event) => {
        if (event.key === "Enter" && onSubmit) onSubmit(event.currentTarget.value);
      }}
      aria-label={ariaLabel || placeholder}
    />

    <span className={styles.searchIcon}>
      <Image
        src="/assets/explore-page-assets/search-icon.svg"
        alt=""
        width={18}
        height={18}
      />
    </span>
  </div>
);

export default SearchBar;
