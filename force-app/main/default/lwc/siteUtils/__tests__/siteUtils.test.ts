describe('c/siteUtils', () => {
    const originalUrl = document.URL;

    beforeEach(() => {
        jest.resetModules();
    });

    afterEach(() => {
        Object.defineProperty(document, 'URL', { value: originalUrl, configurable: true });
    });

    it('is false for a normal record page url', async () => {
        Object.defineProperty(document, 'URL', {
            value: 'https://example.my.salesforce.com/lightning/r/Account/001/view',
            configurable: true,
        });

        const { inSitePreview } = await import('c/siteUtils');

        expect(inSitePreview).toBe(false);
    });

    it.each([
        ['sitepreview', 'https://example.builder.salesforce-sites.com/sitepreview/page'],
        ['livepreview', 'https://example.com/livepreview/page'],
        ['live-preview', 'https://example.com/live-preview/page'],
        ['live.', 'https://live.example.com/page'],
        ['.builder.', 'https://example.builder.salesforce-experience.com/page'],
    ])('is true when the url matches the "%s" pattern', async (_label, url) => {
        Object.defineProperty(document, 'URL', { value: url, configurable: true });

        const { inSitePreview } = await import('c/siteUtils');

        expect(inSitePreview).toBe(true);
    });
});
