```javascript
const [BrowseModalWrapper, openBrowseModal] = useAppendModal("modal-root", {
	preventScroll: true,
	closeOnOverlayClick: true,
	beforeClose: () => {
		handleResetModal();
	},
	component: Modal.Browse,
});
useEffect(() => {
	switch (modal) {
		case "MODAL_BROWSE":
			openBrowseModal();
			break;
	}
}, [modal]);
```

```jsx
<>
	<BrowseModalWrapper />
	{children}
</>
```
