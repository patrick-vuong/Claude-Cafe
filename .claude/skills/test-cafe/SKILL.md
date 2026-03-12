---
name: "test-cafe"
description: "Run comprehensive tests on Claude Café using two sub-agents: shopping flow and QA"
---

# Test the Café Skill

The dev server runs at http://localhost:3000. Use the Playwright MCP tool to run a full test suite against Claude Café with two sub-agents.

## Sub-Agent 1: Shopping Experience 

Test the complete customer journey:
- Navigate to the café and verify all 5 menu categories load
- Add an item to cart and confirm the token wallet balance updates
- Complete checkout and verify the order confirmation screen shows a unique order ID

## Sub-Agent 2: QA & Responsiveness 

Test UI quality:
- Verify all navigation links and buttons work (Home, Menu, Cart, category tabs, add/remove items)
- Test layout at mobile (375x667), tablet (768x1024), and desktop (1440x900) viewports
- Check for console errors and verify all assets load

## Output Format

Present results as a table:

| Agent | Test | Status | Notes |
|-------|------|--------|-------|
|  Shopping | Browse menu | ✅/❌ | ... |
|  QA | Mobile layout | ✅/❌ | ... |

End with a summary: total tests, passed, failed, and any critical issues.

