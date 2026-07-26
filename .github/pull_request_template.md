### Checklist for Website PR:

#### 🔄 **Git & Branch Management**
- [ ] **Branch Naming**: Follows convention (`feature/FKP-123-description`, `bugfix/FKP-456-fix`)
- [ ] **Commit Messages**: Follows format (`FKP-123 #comment Description`)
- [ ] **Auto-Sync**: Branch is up to date with base branch
- [ ] **Clean History**: No unnecessary merge commits or rebase conflicts
- [ ] **Title of PR**: should also follow the commit messgae format. 

#### 🔍 **Code Quality & Standards**
- [ ] **Analysis**: All linting rules pass.
- [ ] **Code Formatting**: Code is properly formatted.
- [ ] **Code Metrics**: No anti-patterns detected (long-method, long-parameter-list)
- [ ] **No Hard-coded Values**: All constants properly parameterized
- [ ] **Type Safety**: All variables properly typed, no implicit dynamic types

#### 📱 **Web-Specific Checks**
- [ ] **State Management**: Proper state management patterns used Zustand

#### ✅ **Final Checks**
- [ ] **L1 Review (Peer Review)**: At least one team member has reviewed the code
- [ ] **L2 Review (Senior Review)**: At least one Senior member has reviewed the code.
