# Instrukcja - Opera

1. Pobieramy rozszerzenie `Scripter`
1. W ustawieniach zezwalamy na pobieranie wielu plików pod tym adresem
    - **Prywatność i bezpieczeństwo > (dodatkowe uprawnienia) Pobieranie automatyczne > Zezwolono na automatyczne pobieranie wielu plików > Dodaj**
1. Umieszczamy kod z pliku w rozszerzeniu i uruchamiamy je
1. Logujemy się do strony, skrypt powinien zadziałać od momentu przekierowania na main page
1. [Przy kolejnych użyciach] W konsoli uruchamiamy `['tabIndex', 'productIndex', 'notFound'].forEach(key => localStorage.setItem(key, '0'));`

---

Cały proces, przy dobrym transferze zajmie co najmniej półtorej godziny.

Po 5s nieaktywności skrypt wyświetli alert o niepowodzeniu więc warto sprawdzać postępy co jakiś czas.

Przypadkowe przekierowanie może wysypać skrypt.
