# Integration: Telegram

## Prerequisites

- Owner has Telegram installed and a personal account
- Decide the group structure: a main group for daily traffic plus purpose-specific groups as needed (one purpose per group keeps routing clean)

## Credential setup

- Create the bot via @BotFather; record the bot token on-instance per `core/security/secrets-pattern.md`
- Disable group privacy mode for the bot if it must read all group messages (BotFather → Bot Settings → Group Privacy)

## Configuration

- Add the bot to each group; record each `chat_id` in the channel routing tables (`BOOT.md` and `Agent/SOPs.md`)
- Record the owner's personal Telegram user id in `Agent/Trust.md` Known IDs (Tier 4 verification depends on it)
- Unknown DM policy: Iron Gate Protocol, always

## Verification

- Round-trip per group: owner sends a message, agent replies in the same group with correct formatting
- Send a DM from a phone number NOT in Trust.md; confirm the Iron Gate deflection fires and the attempt is logged

## Known traps

- MarkdownV2 escaping: these characters must be escaped with a preceding `\` or the send fails outright: `. ! ( ) - + = { } [ ] | > # ~`. Common failures: `~$15k` needs `\~`, `1.5` needs `1\.5`, `(one year only)` needs `\(one year only\)`
- Markdown tables do not render in Telegram; pipe characters print literally. Use bullet lists instead
- Bold is single asterisks (`*bold*`) in MarkdownV2, not double
- (append as learned)
