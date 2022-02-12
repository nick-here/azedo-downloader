# Instrukcja

1. Pobieramy dowolne rozszerzenie wywołujące js na przeglądarce
1. W ustawieniach zezwalamy na pobieranie wielu plików pod tym adresem
    - Opera: **Prywatność i bezpieczeństwo > (dodatkowe uprawnienia) Pobieranie automatyczne > Zezwolono na automatyczne pobieranie wielu plików > Dodaj**
1. Umieszczamy kod z pliku w rozszerzeniu i uruchamiamy je
1. Logujemy się do strony, skrypt powinien zadziałać od momentu przekierowania na main page
1. [Przy kolejnych użyciach] W konsoli uruchamiamy `localStorage.setItem('productIndex', '0');localStorage.setItem('tabIndex', 0);`

---

Cały proces, przy dobrym transferze zajmie co najmniej półtorej godziny.

Po 5s nieaktywności skrypt wyświetli alert o niepowodzeniu więc warto sprawdzać postępy co jakiś czas.

Przypadkowe przekierowanie może wysypać skrypt.
