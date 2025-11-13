# A little bit better version of Poor app :)

At the first time seems too complicated implementation.
But I tried to make it scalable.

So some design patterns and principles were used.

All implementations of Adapters and Storages can be replaced with others.

For example if you want to use internal storage (localStorage, IndexedDB, or whatever) you can just implement new adapter and replace injection.

This is not perfect app, not too much tests.

PS: Cast members loading was removed from each row, as it leads a poor performance and backend spamming.
Instead of I made a small dialog for cast members. Hope it will not break current UX too much.
