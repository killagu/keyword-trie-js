TESTS = $(shell find test -type f -name "*.test.js")
TEST_TIMEOUT = 10000
MOCHA_REPORTER = spec

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(MOCHA_REPORTER) \
		-r should \
		--timeout $(TEST_TIMEOUT) \
		$(TESTS)

test-cov cov:
	@NODE_ENV=test node \
		node_modules/.bin/istanbul cover --preserve-comments \
		-x **/fitnessmodule/** \
		./node_modules/.bin/_mocha \
		-- \
		-r should \
		--reporter $(MOCHA_REPORTER) \
		--timeout $(TEST_TIMEOUT) \
		$(TESTS)

.PHONY: install test doc test-cov
