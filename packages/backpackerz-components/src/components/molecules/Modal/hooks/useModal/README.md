```jsx
<ModalProvider
	modals={[
		{
			type: "MODAL_BROWSE",
			options: {},
			component: Modal.Browse,
		},
		{
			type: "MODAL_LOGIN",
			options: {},
			component: Modal.Sign,
		},
		{
			type: "MODAL_ITINERARY_CREATE",
			options: {},
			component: Modal.ItineraryCreate,
		},
		{
			type: "MODAL_EVENT_CREATE",
			options: {},
			component: Modal.EventCreate,
		},
	]}
>
	{children}
</ModalProvider>
```

```javascript
const modal = useModal();
modal.show({
	type: "MODAL_BROWSE",
});
```
