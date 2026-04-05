"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { useQuery } from "@tanstack/react-query";
import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import styles from "./search.module.css";
import { SearchProps } from "./search.types";

const Search = <TOption,>({
  queryKey,
  fetchOptions,
  getOptionLabel,
  getOptionKey,
  placeholder = "search",
  ariaLabel = "search",
  defaultValue,
  className,
  minLength = 0,
  emptyLabel = "No results found.",
  onValueChange,
  onSelect,
}: SearchProps<TOption>) => {
  const [inputValue, setInputValue] = useState(defaultValue ?? "");
  const rootClassName = [styles.root, className].filter(Boolean).join(" ");

  const { data: options = [], isFetching } = useQuery({
    queryKey,
    queryFn: fetchOptions,
    staleTime: 60_000,
  });

  const filteredOptions = inputValue.trim()
    ? options.filter((item) =>
        getOptionLabel(item).toLowerCase().includes(inputValue.toLowerCase())
      )
    : options;

  const shouldRenderEmptyState =
    inputValue.trim().length >= minLength &&
    !isFetching &&
    filteredOptions.length === 0;

  return (
    <Autocomplete.Root
      items={filteredOptions}
      value={inputValue}
      onValueChange={(nextValue) => {
        setInputValue(nextValue);
        onValueChange?.(nextValue);
      }}
      openOnInputClick
      autoHighlight
      itemToStringValue={getOptionLabel}
    >
      <Autocomplete.InputGroup
        className={`${rootClassName} ${styles.inputGroup}`}
      >
        <SearchIcon size={14} className={styles.icon} aria-hidden />
        <Autocomplete.Input
          className={styles.input}
          aria-label={ariaLabel}
          placeholder={placeholder}
        />
      </Autocomplete.InputGroup>

      <Autocomplete.Portal>
        <Autocomplete.Positioner sideOffset={4} align="start">
          <Autocomplete.Popup className={styles.popup}>
            <Autocomplete.List className={styles.list}>
              {(item: TOption, index: number) => {
                const optionKey =
                  getOptionKey?.(item, index) ??
                  `${getOptionLabel(item)}-${index}`;

                return (
                  <Autocomplete.Item
                    key={optionKey}
                    value={item}
                    className={styles.item}
                    onClick={() => onSelect?.(item)}
                  >
                    {getOptionLabel(item)}
                  </Autocomplete.Item>
                );
              }}
            </Autocomplete.List>
            {shouldRenderEmptyState ? (
              <Autocomplete.Empty className={styles.empty}>
                {emptyLabel}
              </Autocomplete.Empty>
            ) : null}
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
};

export default Search;
